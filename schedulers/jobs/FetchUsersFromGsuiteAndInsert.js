const { firstOrDefault, asyncForEach } = require("../../helpers/helper");
const apps = require('../../constants/app');
const Model = require("../../models/GalUser");
const logger = require("../../helpers/logger");
const listUsers = require("../../helpers/listUsers");


const mapUser = (user) => {
  const emails = Array.isArray(user.emails) ? user.emails : [];
  const phones = Array.isArray(user.phones) ? user.phones : [];
  const organizations = Array.isArray(user.organizations) ? user.organizations : [];
  const firstOrg = firstOrDefault(organizations, obj => obj.primary === true, { name: '', title: '', department: '' });

  return {
    Id: user.id,
    Name: user.name.givenName,
    LastName: user.name.familyName,
    EmailAddress: firstOrDefault(emails, obj => obj.primary === true, emails[0]).address,
    Mobile: firstOrDefault(phones, obj => obj.type === 'mobile', { value: '' }).value,
    Phone: firstOrDefault(phones, obj => obj.type === 'work', { value: '' }).value,
    Title: ((firstOrg.name ? firstOrg.name : '') + ' ' + (firstOrg.title ? firstOrg.title : '')).trim(),
    Department: (firstOrg.department ? firstOrg.department : '').trim(),
  };
};

const bulkCreate = async (users, company) => {
  const CompanyId = company.id, CompanyName = company.name;

  for (let i = 0; i < users.length; i++) {

    const user = mapUser(users[i]);

    logger.info(`is being processed`, { user, company });

    try {

      const userIns = await Model.findOne({ where: { Id: user.Id, CompanyId } });
      if (userIns) {

        logger.info(`already exists it will be updated`, { user, company });

        await userIns.update(user);

      } else {
        logger.info(` will be inserted`, { user, company });
        await Model.create({ ...user, CompanyName, CompanyId });
      }

    } catch (e) {
      logger.error(`error was occured during excution of :${e.toString()}`, { user, company });
    }

  }

};

const fetchData = () => {

  asyncForEach(apps, async (app) => {
    await listUsers(app, async (userResult) => {
      logger.http(`the number of fetched users: ${userResult.users.length}`);
      await bulkCreate(userResult.users, app.company);
    });
  });

};

module.exports = fetchData;






const {SequelizeInstance, Sequelize, DataTypes} = require("../models/Sequelize");
const {companyId} = require("../constants/common");
const {currentDate} = require("../helpers/helper");

const Model = SequelizeInstance.define('GalUser', {
  Id: {type: DataTypes.STRING, field: 'ObjectGuid', primaryKey: true},
  Name: DataTypes.STRING,
  LastName: DataTypes.STRING,
  About: DataTypes.STRING,
  CompanyId: {type: DataTypes.INTEGER, defaultValue: companyId},
  CompanyName: {type: DataTypes.STRING},
  Title: {type: DataTypes.STRING, defaultValue: ""},
  Department: {type: DataTypes.STRING, defaultValue: ""},
  NuxeoPassword: {type: DataTypes.STRING, defaultValue: ""},
  EmailAddress: DataTypes.STRING,
  Mobile: DataTypes.STRING,
  Phone: DataTypes.STRING,
  CreationTime: {type: DataTypes.STRING, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  SystemUpdateDate: {type: DataTypes.STRING},
  SystemCreateDate: {type: DataTypes.STRING, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  LastModificationTime: {type: DataTypes.STRING, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  IsActive: {type: DataTypes.INTEGER, defaultValue: 1},
  IsDeleted: {type: DataTypes.INTEGER, defaultValue: 0},
  IsAcceptedAgreements: {type: DataTypes.BOOLEAN, defaultValue: 0},
}, {
  tableName: "GalCommunityUser",
  createdAt: false,
  updatedAt: false,
  setterMethods: {
    IsAcceptedAgreements: function (v) { /* do your magic with the input here! */
      if (typeof v == 'boolean')
        v = v ? 1 : 0;
      this.setDataValue('IsAcceptedAgreements', v);
    },
    BirthDate: function (b) {
      if (b == "")
        b = null;
      this.setDataValue('BirthDate', b);
    }
  },
  getterMethods: {
    ProfilePrivacy: function (v) {
      let value = this.getDataValue('ProfilePrivacy');
      if (typeof value !== 'boolean')
        value = value ? true : false;
      this.setDataValue('ProfilePrivacy', value);
      return this.getDataValue('ProfilePrivacy');
    }
  },
  hooks: {
    beforeUpdate(model) {
      const datestring = currentDate();
      model.SystemUpdateDate = datestring;
      model.LastModificationTime = datestring;
    }
  }
});

module.exports = Model;


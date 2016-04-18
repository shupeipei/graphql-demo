export default (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {type: DataTypes.STRING, primaryKey: true, field: 'f_id'},
    user_name: {type: DataTypes.STRING, field: 'f_user_name'},
    password: {type: DataTypes.FLOAT, field: 'f_password'},
    name: {type: DataTypes.STRING, field: 'f_realname'},
    mobile: {type: DataTypes.STRING, field: 'f_mobile'}
  }, {
    timestamps: false,
    tableName: 'GD_USER',
    classMethods: {
      associate: ({Task, User}) => {
        User.hasMany(Task)
      }
    }
  })
}

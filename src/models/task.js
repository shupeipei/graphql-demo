export default (sequelize, DataTypes) => {
  return sequelize.define('Task', {
    id: {type: DataTypes.STRING, primaryKey: true, field: 'f_id'},
    title: {type: DataTypes.STRING, field: 'f_title'},
    content: {type: DataTypes.STRING, field: 'f_content'}
  }, {
    tableName: 'GD_TASK',
    classMethods: {
      associate: ({Task, User}) => {
        Task.belongsTo(User)
      }
    }
  })
}

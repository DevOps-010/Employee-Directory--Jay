module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("Employee", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hireDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      timestamps: true
    });
  
    return Employee;
  };
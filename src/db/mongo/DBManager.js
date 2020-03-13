import mongoose from 'mongoose';

class DBManager {

  static mongoInstance = null;

  static getInstance(host, port, database, userId, userPassword) {
    if (!this.mongoInstance) {
      this.mongoInstance = new DBManager(host, port, database, userId, userPassword);
    }
    return this.mongoInstance;
  }

  constructor(host, port, database, userId, userPassword) {
    this.host = host;
    this.port = port;
    this.userId = userId;
    this.userPassword = userPassword;
    this.database = database;
    this.dbUrl = `mongodb://${this.userId}:${this.userPassword}@${this.host}:${this.port}/${this.database}`;
  }

  connect() {
    console.log('[DBManager - mongo] 커넥션을 맺습니다.');
    console.log(`[DBManager - mongo] DBUrl : ${this.dbUrl}`);

    return mongoose.connect(this.dbUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }

  closeConnection({ connection }) {
    if (connection) {
      return connection.close().then(() => {
        console.log('[DBManager - mongo] 커넥션이 성공적으로 끊어졌습니다.');
      });
    }
  }
}

export default DBManager;

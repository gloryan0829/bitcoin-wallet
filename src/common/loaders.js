import expressLoader from "./expressLoader";
import mongooseLoader from "./mongooseLoader";

export default (app) => {
  expressLoader(app);
  console.log('✔️ Express Initialized');

  mongooseLoader();
  console.log('✔️ Mongoose Initialized');
}

const bcrypt = require("bcrypt");
const myPassword = "P@ss";
const inputPassword = "P@ss1";
async function checkPass() {
  //   try {

  //   } catch (err) {

  //   }

  try {
    const hashPass = await bcrypt.hash(myPassword, 10);
    const result = await bcrypt.compare(inputPassword, hashPass);
    console.log(hashPass);
    console.log(result);
  } catch (err) {
      console.log(err)
  }
}

checkPass();

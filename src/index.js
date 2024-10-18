// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// We need to write a function that fetches user data from all three databases, and returns a promise that resolves with the fetched user data.
// Central provides which database the user belongs to, based on their id.
// We then fetch user data from the appropriate database using db1, db2, or db3, to obtain the username, website, and company data.
// We can access the key that matches the database return from central, as this key contains the function we need to invoke. Then we just chain (id) into it.
// We then invoke vault to get the user's name, email, address, and phone data.
// Central and vault don't really depend on each other, so we can combine them into a single promise.

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

    const [dbName, vaultData] = await Promise.all([central(id), vault(id)]);
    const dbData = await dbs[dbName](id);
    console.log(JSON.stringify({ ...dbData, ...vaultData }));

    return {
      id,
      ...dbData,
      ...vaultData,
    };
}

getUserData(6);
getUserData('11');
getUserData(16);
getUserData(0);
getUserData(false);
getUserData(3.5);


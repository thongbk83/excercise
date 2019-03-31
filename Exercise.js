//Lession 1 , complexity is O(n)

function removeVowelsFromString(testString){
 const vowel =new Set(['a', 'e', 'i', 'o', 'u']);
return string.split('').filter(e=> !vowel.has(e.toLowerCase())).join('');
}


//Lession 2
//problem : callback hell. 

const getAccountId = async (apiKey, cb) => {

  const connection = await sql.conect(connectionString);
  const result1 = await connection.query(query1);
  console.log(result1)
  const result2 = await connection.query(query2,{...result1});
  console.log(result2);
  const result3 = await connection.query(query3, {...result2})
  console.log(result3)  
}

module.exports = {
  getAccountId
}
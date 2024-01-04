/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  let map = new Map();
  for (let i = 0; i < str1.length; i++) {
    if (map.has(str1[i])) {
      map.set(str1[i], map.get(str1[i]) + 1);
    } else {
      map.set(str1[i], 1);
    }
  }
  // let mapKeys = map.keys();
  // for (let k of mapKeys) {
  //   console.log(k + "-" + map.get(k));
  // }
  for (let i = 0; i < str2.length; i++) {
    if (map.has(str2[i])) {
      if (map.get(str2[i]) <= 1) {
        map.delete(str2[i]);
      } else {
        map.set(str2[i], map.get(str2[i]) - 1);
      }
    }
  }
  if (map.size === 0) {
    return true;
  }
  return false;
}

module.exports = isAnagram;

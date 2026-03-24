function xorEncrypt(text, key) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const textCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(i % key.length);
    result += String.fromCharCode(textCode ^ keyCode);
  }

  return result;
}

const tekst = "Hei verden";
const nøkkel = "abc";

const kryptert = xorEncrypt(tekst, nøkkel);
const dekryptert = xorEncrypt(kryptert, nøkkel);

console.log(kryptert);
console.log(dekryptert);
console.log([...kryptert].map(c => c.charCodeAt(0)))

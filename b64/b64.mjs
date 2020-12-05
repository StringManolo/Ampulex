let encodeB64 = data => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let dataBin = "";
  for (let i in data) {
    let aux = ((data[i].charCodeAt(0) >>> 0).toString(2));
    if (aux.length < 8) {
      while (aux.length < 8) {
        aux = "0" + aux;
      }
    }

    dataBin += aux;
  }

  dataBin = dataBin.match(/.{1,6}/g);

  let end = "";
  for (let i in dataBin) { 
    if (dataBin[i].length == 6) {
      end += charset[parseInt(dataBin[i],2).toString(10)];
    } else {
      let padding = 6 - dataBin[i].length;
      if (padding / 2 == 1) {
        end += charset[parseInt(dataBin[i]+"00",2).toString(10)] + "=";
      } else if(padding / 2 == 2) {
        end += charset[parseInt(dataBin[i]+"0000",2).toString(10)] + "==";
      }
    } 
  }
 
  return end;
};


let decodeB64 = data => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  
  const paddingChars = (data.match(/=/g) || []).length;

  let dataBin = [];
  for (let i = 0, aux; i < data.length-paddingChars; ++i) {
    for (let j in charset) {
      if (charset[j] === data[i]) {
	aux = (j >>> 0).toString(2)
	if (aux.length < 6) {
          while (aux.length < 6) {
            aux = "0" + aux;
	  }
	}
	dataBin.push(aux);
      }
    }
  }

  if (paddingChars === 1) {
    dataBin.push("00");
  } else if (paddingChars === 2) {
    dataBin.push("0000");
  }

  dataBin = dataBin.join("");
  dataBin = dataBin.match(/.{1,8}/g);
  
  let end = "";

  for (let i in dataBin) {
    if (+dataBin[i]) {
      end += String.fromCharCode(parseInt(dataBin[i], 2));
    }
  }
  
  return end;
};

let base64 = (mode, data) => (mode == "e" ? encodeB64(data) : decodeB64(data));

export default base64;

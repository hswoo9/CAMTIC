package egovframework.com.devjitsu.common.utiles;

import org.apache.commons.codec.binary.Base64;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;
import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * AESCipher: AES 128bit 암호화 
 * 
 */

public class AESCipher {
	
	private static final Logger log = LoggerFactory.getLogger(AESCipher.class);

	final static String secretKey = "1023497555960596"; 

	// 암호화
	public static String AES_Encode(String str)
			throws UnsupportedEncodingException,
			NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, InvalidAlgorithmParameterException,
			IllegalBlockSizeException, BadPaddingException {
		byte[] keyData = secretKey.getBytes();

		SecretKey secureKey = new SecretKeySpec(keyData, "AES");

		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.ENCRYPT_MODE, secureKey,
				new IvParameterSpec(secretKey.getBytes()));

		byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
		String enStr = new String(Base64.encodeBase64(encrypted));

		return enStr;
	}

	// 복호화
	public static String AES_Decode(String str)
			throws UnsupportedEncodingException,
			NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, InvalidAlgorithmParameterException,
			IllegalBlockSizeException, BadPaddingException {
		byte[] keyData = secretKey.getBytes();
		SecretKey secureKey = new SecretKeySpec(keyData, "AES");
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.DECRYPT_MODE, secureKey,
				new IvParameterSpec(secretKey.getBytes("UTF-8")));
		
		byte[] byteStr = Base64.decodeBase64(str.getBytes());

		return new String(c.doFinal(byteStr), "UTF-8");
	}
	
	/*
	// 보안성 획득 방안(키 생성 )
		1.	암호화를 하는 시점을 문자열로 받는다. 형식은 yyyyMMddHHmmss
		2.	해당 문자열을 암호화하여 accessToken으로 보낸다.
	// 보안성 획득 방안(키 유효성 체크)
		1.	암호화된 accessToken을 받아서 복호화한다.
		2.	날짜포맷이 맞는지 검증한다. 포맷은 yyyyMMddHHmmss
		3.	앞의 yyyyMMdd 만 빼내어 현재 날짜와 같은지 확인한다.
	*/
	@Test
	public static String makeAccessToken() throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, 
		NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException
	{
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String nowString = sdf.format(now);
		
		String accessToken = AESCipher.AES_Encode(nowString);
		
		System.out.println("암호화 전 : " + nowString + " / 암호화 후  accessToken : " + accessToken + " / 복호화 : " + AESCipher.AES_Decode(accessToken));
		//log.info("암호화 전 : " + nowString + " / 암호화 후  accessToken : " + accessToken + " / 복호화 : " + AESCipher.AES_Decode(accessToken));
		
		return accessToken;
	}

	public static String AES128SCRIPT_Decode(String inputPassWord, Boolean complicatedKeyFlag) throws IOException, NoSuchAlgorithmException, NoSuchPaddingException{

		String strASEPW = URLDecoder.decode(inputPassWord.substring(1), "UTF-8");
		byte[] decodeBase64 = Base64.decodeBase64(strASEPW.getBytes());

		byte[] key = new byte[]{'d', 'u', 'z', 'o', 'n', '@', '1', '2', '3', '4', '1', '2', '3', '4', '1', '2'};

		if(complicatedKeyFlag) {
			key = new byte[]{'f', 'w', 'x', 'd', 'u', '#', '*', '1', 'g', '@', '1', '3', '8', '@', 'l', '3'};
		}

		SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");

		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		AlgorithmParameterSpec iv = new IvParameterSpec(key);
		try{
			cipher.init(Cipher.DECRYPT_MODE, skeySpec,iv);
			byte[] original = cipher.doFinal(decodeBase64);
			strASEPW = new String(original, "UTF-8");
		} catch (Exception e){
			//System.out.println(e.toString());
			//CommonUtil.printStatckTrace(e);//오류메시지를 통한 정보노출
		}

		return strASEPW;

	}
}


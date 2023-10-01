package egovframework.devjitsu.common.utiles;


import egovframework.com.devjitsu.doc.config.EgovFileScrty;

public class LoginUtil {

    public static String passwordEncrypt(String userPassword) throws Exception {
        if(userPassword != null && !userPassword.equals("")){
            return EgovFileScrty.encryptPassword(userPassword);
        }else{
            return "";
        }
    }

}

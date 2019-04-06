package com.yuyue.util;

import org.apache.shiro.crypto.hash.Md5Hash;

public class Md5Util {

	public static String md5(String password) {
        String encodedPassword = new Md5Hash(password+"yuyue").toString();
        String againencodedPassword = new Md5Hash(encodedPassword+"qaubrd").toString();
        return againencodedPassword;
	}
	
}

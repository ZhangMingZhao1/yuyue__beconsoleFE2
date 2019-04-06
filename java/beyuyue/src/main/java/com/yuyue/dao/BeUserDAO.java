package com.yuyue.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BeUser;

public interface BeUserDAO extends JpaRepository<BeUser, Integer> {

	BeUser getByUserNameAndPassword(String userName, String password);
	
}

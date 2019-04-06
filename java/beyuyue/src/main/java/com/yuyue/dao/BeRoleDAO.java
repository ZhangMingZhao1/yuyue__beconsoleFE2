package com.yuyue.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BeRole;

public interface BeRoleDAO extends JpaRepository<BeRole, Integer> {

	public List<BeRole> findByName(String name);
	
}

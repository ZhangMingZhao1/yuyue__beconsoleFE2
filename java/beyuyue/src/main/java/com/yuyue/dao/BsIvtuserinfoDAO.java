package com.yuyue.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BsInvitecode;
import com.yuyue.pojo.BsIvtuserinfo;

public interface BsIvtuserinfoDAO extends JpaRepository<BsIvtuserinfo, Integer> {
	public List<BsIvtuserinfo> findByBsInvitecode(BsInvitecode bsInvitecode);
}

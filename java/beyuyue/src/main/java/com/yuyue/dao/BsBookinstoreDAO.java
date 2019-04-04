package com.yuyue.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.yuyue.pojo.BsBookinfo;
import com.yuyue.pojo.BsBookinstore;

public interface BsBookinstoreDAO extends JpaRepository<BsBookinstore, Integer> {
	
	public List<BsBookinstore> findByBsBookinfo(BsBookinfo bsBookinfo);
	
	/**
	 * 多表多条件级联查询
	 * @param bookName
	 * @param isbn
	 * @param author
	 * @param pageable
	 * @return
	 */
	@Query("from BsBookinstore t where t.bsBookinfo.bookName like ?1 or t.bsBookinfo.isbn like ?2 or t.bsBookinfo.author like ?3")
	public Page<BsBookinstore> queryByBookNameLikeOrIsbnLikeOrAuthorLike(String bookName, String isbn, String author, Pageable pageable);

}

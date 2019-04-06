package com.yuyue.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.yuyue.pojo.BeWarehouse;

public interface BeWarehouseDAO extends JpaRepository<BeWarehouse, Integer> {

	@Query("from BeWarehouse t where (t.warehouseName like ?1 or t.warehouseCode like ?2 or t.contacts like ?3 "
			+ "or t.warehouseAddress like ?4) and t.beDepartment.id = ?5")
	public Page<BeWarehouse> queryByWarehouseNameLikeOrWarehouseCodeLikeOrContactsLikeOrWarehouseAddressLikeAndBeDepartmentEquals
	(String warehouseName, String warehouseCode, String contacts, String warehouseAddress, int id, Pageable pageable);
	
	@Query("from BeWarehouse t where t.warehouseName like ?1 or t.warehouseCode like ?2 or t.contacts like ?3 "
			+ "or t.warehouseAddress like ?4")
	public Page<BeWarehouse> queryByWarehouseNameLikeOrWarehouseCodeLikeOrContactsLikeOrWarehouseAddressLike
	(String warehouseName, String warehouseCode, String contacts, String warehouseAddress, Pageable pageable);
	
}

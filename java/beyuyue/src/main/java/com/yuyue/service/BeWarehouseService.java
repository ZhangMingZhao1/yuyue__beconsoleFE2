package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BeWarehouseDAO;
import com.yuyue.pojo.BeWarehouse;
import com.yuyue.util.Page4Navigator;

@Service
public class BeWarehouseService {

	@Autowired
	public BeWarehouseDAO beWarehouseDAO;
	
	public Page4Navigator<BeWarehouse> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"warehouseId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BeWarehouse> pageFromJPA = beWarehouseDAO.findAll(pageable);
		return new Page4Navigator<BeWarehouse>(pageFromJPA, navigatePages);
	}
	
	public Page4Navigator<BeWarehouse> list(int start, int size, int navigatePages, 
			String keyword, int id){
		Sort sort = new Sort(Sort.Direction.DESC,"warehouseId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BeWarehouse> pageFromJPA = beWarehouseDAO.
				queryByWarehouseNameLikeOrWarehouseCodeLikeOrContactsLikeOrWarehouseAddressLikeAndBeDepartmentEquals
						("%"+keyword+"%", "%"+keyword+"%", "%"+keyword+"%", "%"+keyword+"%", id, pageable);
		return new Page4Navigator<BeWarehouse>(pageFromJPA, navigatePages);
	}
	
	public Page4Navigator<BeWarehouse> list(int start, int size, int navigatePages, 
			String keyword){
		Sort sort = new Sort(Sort.Direction.DESC,"warehouseId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BeWarehouse> pageFromJPA = beWarehouseDAO.
				queryByWarehouseNameLikeOrWarehouseCodeLikeOrContactsLikeOrWarehouseAddressLike
						("%"+keyword+"%", "%"+keyword+"%", "%"+keyword+"%", "%"+keyword+"%", pageable);
		return new Page4Navigator<BeWarehouse>(pageFromJPA, navigatePages);
	}
	
	public int addWarehouse(BeWarehouse beWarehouse) {
		BeWarehouse bw = beWarehouseDAO.save(beWarehouse);
		return bw.getWarehouseId();
	}
	
	public int updateWarehouse(BeWarehouse beWarehouse) {
		BeWarehouse bw = beWarehouseDAO.save(beWarehouse);
		return bw.getWarehouseId();
	}
	
	public int deleteWarehouse(int warehouseId) {
		try {
			beWarehouseDAO.delete(warehouseId);
			return 1;
		} catch (Exception e) {
			return 0;
		}
	}
	
	public BeWarehouse getWarehouse(int warehouseId) {
		return beWarehouseDAO.findOne(warehouseId);
	}
	
}

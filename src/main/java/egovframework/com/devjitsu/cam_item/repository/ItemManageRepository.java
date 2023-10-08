package egovframework.com.devjitsu.cam_item.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ItemManageRepository extends AbstractDAO {

    public List<Map<String, Object>> getItemWhInfoList(Map<String, Object> params) { return selectList("item.getItemWhInfoList", params);}
    public void setInspectionUpd(Map<String, Object> params) { insert("item.setInspectionUpd", params);}
    public void setReceivingReg(Map<String, Object> params) { insert("item.setReceivingReg", params);}
    public void setReceivingRegUpd(Map<String, Object> params) { insert("item.setReceivingRegUpd", params);}
    public List<Map<String, Object>> getItemInvenList(Map<String, Object> params) { return selectList("item.getItemInvenList", params);}
    public Map<String, Object> getItemInven(Map<String, Object> params){ return (Map<String, Object>) selectOne("item.getItemInven", params);}
    public void setInvenTransferReg(Map<String, Object> params) { insert("item.setInvenTransferReg", params);}
    public void setInvenTransferRegUpd(Map<String, Object> params) { insert("item.setInvenTransferRegUpd", params);}
    public List<Map<String, Object>> getInvenTransferHistoryList(Map<String, Object> params) { return selectList("item.getInvenTransferHistoryList", params);}
}

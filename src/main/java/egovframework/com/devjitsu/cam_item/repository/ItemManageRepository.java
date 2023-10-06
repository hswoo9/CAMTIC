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
}

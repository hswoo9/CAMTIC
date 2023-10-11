package egovframework.com.devjitsu.cam_item.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ItemManageRepository extends AbstractDAO {

    public List<Map<String, Object>> getItemStandardUnitPriceList(Map<String, Object> params) { return selectList("item.getItemStandardUnitPriceList", params);}
    public List<Map<String, Object>> getSdunitPriceList(Map<String, Object> params) { return selectList("item.getSdunitPriceList", params);}
    public String getMaxChangeNum(Map<String, Object> params) { return (String) selectOne("item.getMaxChangeNum", params);}
    public void setSdUnitPriceReg(Map<String, Object> params) { insert("item.setSdUnitPriceReg", params);}
    public void setSdUnitPriceEndDtUpd(Map<String, Object> params) { insert("item.setSdUnitPriceEndDtUpd", params);}
    public void setSdUnitPriceRegUpd(Map<String, Object> params) { insert("item.setSdUnitPriceRegUpd", params);}
    public void setSdUnitPriceDel(Map<String, Object> params) { delete("item.setSdUnitPriceDel", params);}
    public List<Map<String, Object>> getBomList(Map<String, Object> params) { return selectList("item.getBomList", params);}
    public Map<String, Object> getBom(Map<String, Object> params){ return (Map<String, Object>) selectOne("item.getBom", params);}
    public List<Map<String, Object>> getBomDetailList(Map<String, Object> params) { return selectList("item.getBomDetailList", params);}
    public void setBomDel(Map<String, Object> params) { delete("item.setBomDel", params);delete("item.setBomDetailDel", params);}
    public void setBom(Map<String, Object> params) { insert("item.setBom", params);}
    public void setBomUpd(Map<String, Object> params) { insert("item.setBomUpd", params);}
    public void setBomDetail(Map<String, Object> params) { insert("item.setBomDetail", params);}
    public void setBomDetailUpd(Map<String, Object> params) { insert("item.setBomDetailUpd", params);}
    public List<Map<String, Object>> getMaterialUnitPriceList(Map<String, Object> params) { return selectList("item.getMaterialUnitPriceList", params);}
    public List<Map<String, Object>> getCrmItemUnitPriceList(Map<String, Object> params) { return selectList("item.getCrmItemUnitPriceList", params);}
    public String getCrmItemMaxChangeNum(Map<String, Object> params) { return (String) selectOne("item.getCrmItemMaxChangeNum", params);}
    public void setCrmItemUnitPriceReg(Map<String, Object> params) { insert("item.setCrmItemUnitPriceReg", params);}
    public void setCrmItemUnitPriceEndDtUpd(Map<String, Object> params) { insert("item.setCrmItemUnitPriceEndDtUpd", params);}
    public void setCrmItemUnitPriceRegUpd(Map<String, Object> params) { insert("item.setCrmItemUnitPriceRegUpd", params);}
    public void setCrmItemUnitPriceDel(Map<String, Object> params) { delete("item.setCrmItemUnitPriceDel", params);}
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

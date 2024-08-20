package egovframework.com.devjitsu.cam_item.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ItemSystemRepository extends AbstractDAO {
    public List<Map<String, Object>> getCrmItemManageList(Map<String, Object> params) {return selectList("itemSystem.getCrmItemManageList", params);}
    public void setCrmItemManage(Map<String, Object> params) {insert("itemSystem.setCrmItemManage", params);}
    public void setCrmItemManageUpd(Map<String, Object> params) {update("itemSystem.setCrmItemManageUpd", params);}
    public void setCrmItemManageDel(Map<String, Object> params) {delete("itemSystem.setCrmItemManageDel", params);}
    public List<Map<String, Object>> groupCodeList(Map<String, Object> params) {return selectList("itemSystem.groupCodeList", params);}
    public void saveGroupCode(Map<String, Object> params) {insert("itemSystem.insGroupCode", params);}
    public List<Map<String, Object>> codeList(Map<String, Object> params) {return selectList("itemSystem.codeList", params);}
    public void insSetLgCode(Map<String, Object> params) {update("itemSystem.insSetLgCode", params);}
    public List<Map<String, Object>> smCodeList(Map<String, Object> params) {return selectList("itemSystem.smCodeList", params);}
    public void insItemCode(Map<String, Object> params) {insert("itemSystem.insItemCode", params);}
    public List<Map<String, Object>> selLgCode(Map<String, Object> params) {return selectList("itemSystem.selLgCode", params);}
    public List<Map<String, Object>> selSmCode(Map<String, Object> params) {return selectList("itemSystem.selSmCode", params);}
    public List<Map<String, Object>> getItemMasterList(Map<String, Object> params) {return selectList("itemSystem.getItemMasterList", params);}
    public Map<String, Object> getItemMaster(Map<String, Object> params) {return (Map<String, Object>) selectOne("itemSystem.getItemMaster", params);}
    public Map<String, Object> getItemNoDuplicate(Map<String, Object> params) { return (Map<String, Object>) selectOne("itemSystem.getItemNoDuplicate", params);}
    public void setItemMasterReg(Map<String, Object> params) {insert("itemSystem.setItemMasterReg", params);}
    public void setItemMasterRegUpd(Map<String, Object> params) {update("itemSystem.setItemMasterRegUpd", params);}
    public void setItemMasterUnitPriceUpd(Map<String, Object> params) {update("itemSystem.setItemMasterUnitPriceUpd", params);}
    public void setItemMasterDel(Map<String, Object> params) {delete("itemSystem.setItemMasterDel", params);}
    public List<Map<String, Object>> getItemCategoryList(Map<String, Object> params) {return selectList("itemSystem.getItemCategoryList", params);}
    public Map<String, Object> getItemCategoryOne(Map<String, Object> params) {return (Map<String, Object>) selectOne("itemSystem.getItemCategoryOne", params);}
    public boolean getCgDuplicateChk(Map<String, Object> params) { return (boolean) selectOne("itemSystem.getCgDuplicateChk", params);}
    public void setItemCategoryReg(Map<String, Object> params) { insert("itemSystem.setItemCategoryReg", params);}
    public void setItemCategoryRegUpd(Map<String, Object> params) { update("itemSystem.setItemCategoryRegUpd", params);}
    public void setItemCategoryDel(Map<String, Object> params) { update("itemSystem.setItemCategoryDel", params);}

    public void updItemCode(Map<String, Object> params) {
        insert("itemSystem.updItemCode", params);
    }

    public void delDetCode(Map<String, Object> params) {
        insert("itemSystem.delDetCode", params);
    }

    public Map<String, Object> getItemCodeCheck(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("itemSystem.getItemCodeCheck", params);
    }
    public Map<String, Object> getItemNo(Map<String, Object> params) { return (Map<String, Object>) selectOne("itemSystem.getItemNo", params);}
}

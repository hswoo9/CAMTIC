package egovframework.com.devjitsu.cam_item.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ItemSystemRepository extends AbstractDAO {
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
    public boolean getItemNoDuplicate(Map<String, Object> params) { return (boolean) selectOne("itemSystem.getItemNoDuplicate", params);}
    public void setItemMasterReg(Map<String, Object> params) {insert("itemSystem.setItemMasterReg", params);}
}

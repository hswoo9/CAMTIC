package egovframework.com.devjitsu.common.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CommonRepository extends AbstractDAO {
    public List<Map<String, Object>> ctDept() {
        return selectList("common.ctDept");
    }

    public List<Map<String, Object>> getUserList(Map<String, Object> params) {
        return selectList("common.getUserList", params);
    }

    public int getUserListTotal(Map<String, Object> map) {
        return (int) selectOne("common.getUserListTotal", map);
    }
    public void insOneFileInfo(Map<String, Object> params) { insert("common.insOneFileInfo", params);}
    public void updOneFileInfo(Map<String, Object> params) { update("common.updOneFileInfo", params);}

    public Map<String, Object> getApprovalDocHwpFile(Map<String, Object> params) { return (Map<String, Object>) selectOne("common.getApprovalDocHwpFile", params);}

    public void insFileInfo(List<Map<String, Object>> list) {
        insert("common.insFileInfo", list);
    }

    public Map<String, Object> getContentFileOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("common.getContentFileOne", params);
    }

    public void getContentFileDelOne(Map<String, Object> params) {
        delete("common.getContentFileDelOne", params);
    }

    public List<Map<String, Object>> commonCodeList(Map<String, Object> params) {
        return selectList("common.commonCodeList", params);
    }

    public String getDeptSeqMax() { return (String) selectOne("common.getDeptSeqMax");}
    public void setDeptInfo(Map<String, Object> params) { insert("common.setDeptInfo", params);}
    public void setDeptInfoUpd(Map<String, Object> params) { update("common.setDeptInfoUpd", params);}
    public void setTeamInfoUpd(Map<String, Object> params) { update("common.setTeamInfoUpd", params);}
    public void setDeptInfoDel(Map<String, Object> params) { update("common.setDeptInfoDel", params);}
    public void setContentIdUpd(Map<String, Object> params) { update("common.setContentIdUpd", params);}

    public List<Map<String, Object>> teamList(Map<String, Object> params) {
        return selectList("common.teamList", params);
    }

    public List<Map<String, Object>> getFileList(Map<String, Object> params) {
        return selectList("common.getFileList", params);
    }
    public List<Map<String, Object>> getSearchMenu(Map<String, Object> params){
        return selectList("common.getSearchMenu", params);
    }
}

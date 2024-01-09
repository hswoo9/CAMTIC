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
        return selectList("common.getSearchMenus", params);
    }

    public void setFavoriteMenuInsert(Map<String, Object> params) { insert("common.setFavoriteMenuInsert", params);}

    public void setDelFvMenu(Map<String, Object> params) {
        delete("common.setDelFvMenu", params);
    }

    public int getSearchMenuCnt(Map<String, Object> params){
        return (int) selectOne("common.getSearchMenuCnt", params);
    }

    public List<Map<String, Object>> getFvMenu(Map<String, Object> params){
        return selectList("common.getFvMenu", params);
    }

    public Map<String, Object> getDept(Map<String, Object> params) { return (Map<String, Object>) selectOne("common.getDept", params);}

    public void insFileUpload(Map<String, Object> fileParameters) {
        insert("common.insFileUpload", fileParameters);
    }

    public void updFileOwner(Map<String, Object> map) {
        update("common.updFileOwner", map);
    }

    public void updFileOwnerCustom(Map<String, Object> map) {
        update("common.updFileOwnerCustom", map);
    }

    public void updFileOwnerNull(Map<String, Object> params) {
        update("common.updFileOwnerNull", params);
    }

    /**
     * 알림
     * @param params
     */
    public List<Map<String, Object>> getAlarmList(Map<String, Object> params) { return selectList("common.getAlarmList", params);}
    public void setAlarm(Map<String, Object> params) { insert("common.setAlarm", params);}
    public void setAlarmCheck(Map<String, Object> params) { update("common.setAlarmCheck", params); }
    public void setAlarmTopListDel(Map<String, Object> params) { update("common.setAlarmTopListDel", params); }
    public void setAlarmAllCheck(Map<String, Object> params) { update("common.setAlarmAllCheck", params); }
    public void setPasswordEncryption(Map<String, Object> params) { update("common.setPasswordEncryption", params); }

    public Map<String, Object> getFileData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("common.getFileData", params);
    }
}

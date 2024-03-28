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
    public List<Map<String, Object>> getDeptList(Map<String, Object> params) {
        return selectList("common.getDeptList", params);
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

    public List<Map<String, Object>> getContentFileList(Map<String, Object> params) {
        return selectList("common.getContentFileList", params);
    }

    public void getContentFileDelOne(Map<String, Object> params) {
        delete("common.getContentFileDelOne", params);
    }

    public void delContentFileOne(Map<String, Object> params) {
        delete("common.delContentFileOne", params);
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

    public void updFileOwnerClaimExnp(Map<String, Object> map) {
        update("common.updFileOwnerClaimExnp", map);
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
    public void setPsCheck(Map<String, Object> params) { insert("common.setPsCheck", params);}
    public void setPasswordEncryption(Map<String, Object> params) { update("common.setPasswordEncryption", params); }

    public Map<String, Object> getFileData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("common.getFileData", params);
    }

    public void insPayAppFileList(Map<String, Object> map) {
        insert("common.insPayAppFileList", map);
    }

    public void insPayIncpFileList(Map<String, Object> map) {
        insert("common.insPayIncpFileList", map);
    }

    public void insFileInfoOne(Map<String, Object> params) {
        insert("common.insFileInfoOne", params);
    }

    public void insPurcFileList(Map<String, Object> map) {
        insert("common.insPurcFileList", map);
    }

    public List<Map<String, Object>> getJangCodeList(Map<String, Object> params) {
        return selectList("common.getJangCodeList", params);
    }

    public List<Map<String, Object>> getGwanCodeList(Map<String, Object> params) {
        return selectList("common.getGwanCodeList", params);
    }

    public List<Map<String, Object>> getHangCodeList(Map<String, Object> params) {
        return selectList("common.getHangCodeList", params);
    }

    public Map<String, Object> getJangInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("common.getJangInfo", params);
    }

    public Map<String, Object> getGwanInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("common.getGwanInfo", params);
    }

    public Map<String, Object> getHangInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("common.getHangInfo", params);
    }

    public void updJangInfo(Map<String, Object> params) {
        update("common.updJangInfo", params);
    }

    public void insJangInfo(Map<String, Object> params) {
        insert("common.insJangInfo", params);
    }

    public void updGwanInfo(Map<String, Object> params) {
        update("common.updGwanInfo", params);
    }

    public void insGwanInfo(Map<String, Object> params) {
        insert("common.insGwanInfo", params);
    }

    public void updHangInfo(Map<String, Object> params) {
        update("common.updHangInfo", params);
    }

    public void insHangInfo(Map<String, Object> params) {
        insert("common.insHangInfo", params);
    }

    public void delJangCode(Map<String, Object> params) {
        delete("common.delJangCode", params);
    }

    public void delGwanCode(Map<String, Object> params) {
        delete("common.delGwanCode", params);
    }

    public void delHangCode(Map<String, Object> params) {
        delete("common.delHangCode", params);
    }
}

package egovframework.com.devjitsu.cam_crm.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CrmRepository extends AbstractDAO {
    public List<Map<String, Object>> getPopCrmList(Map<String, Object> params) {return selectList("crm.getPopCrmList", params);}
    public Map<String, Object> getCrmData(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmData", params);}
    public List<Map<String, Object>> getCrmList(Map<String, Object> params) {return selectList("crm.getCrmList", params);}
    public void setCrmDel(Map<String, Object> params) {delete("crm.setCrmDel", params);}
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmInfo", params);}
    public void updCrmFile(Map<String, Object> fileInsMap) {insert("crm.updCrmFile", fileInsMap);}
    public void updCrmLics(Map<String, Object> fileInsMap) {insert("crm.updCrmLics", fileInsMap);}
    public void updBnCp(Map<String, Object> fileInsMap) {insert("crm.updBnCp", fileInsMap);}
    public List<Map<String, Object>> getCrmFileInfo(Map<String, Object> params) {return selectList("crm.getCrmFileInfo", params);}
    public List<Map<String, Object>> getCrmLicsInfo(Map<String, Object> params) {return selectList("crm.getCrmLicsInfo", params);}
    public List<Map<String, Object>> getBnCpInfo(Map<String, Object> params) {return selectList("crm.getBnCpInfo", params);}
    public int crmReqCheck(Map<String, Object> params) {return (int) selectOne("crm.crmReqCheck", params);}
    public void updCrmInfo(Map<String, Object> params) {update("crm.updCrmInfo", params);}
    public void insCrmInfo(Map<String, Object> params) {insert("crm.insCrmInfo", params);}
    public void updCrmMainData(Map<String, Object> params) {update("crm.updCrmMainData", params);}
    public void insCrmMemInfo(Map<String, Object> params) {insert("crm.insCrmMemInfo", params);}
    public void updCrmMemInfo(Map<String, Object> params) {update("crm.updCrmMemInfo", params);}
    public List<Map<String, Object>> getCrmMemList(Map<String, Object> params) {return selectList("crm.getCrmMemList", params);}
    public void delCrmMemInfo(Map<String, Object> params) {delete("crm.delCrmMemInfo", params);}
    public Map<String, Object> getCrmMemInfo(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmMemInfo", params);}
    public Map<String, Object> getCrmIndustry(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmIndustry", params);}
    public void setCrmIndustry(Map<String, Object> params) {insert("crm.setCrmIndustry", params);}
    public void setCrmIndustryUpd(Map<String, Object> params) {insert("crm.setCrmIndustryUpd", params);}
    public Map<String, Object> getCrmCert(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmCert", params);}
    public void setCrmCert(Map<String, Object> params) {insert("crm.setCrmCert", params);}
    public void setCrmCertUpd(Map<String, Object> params) {insert("crm.setCrmCertUpd", params);}
    public Map<String, Object> getCrmAccounting(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmAccounting", params);}
    public void setCrmAccounting(Map<String, Object> params) {insert("crm.setCrmAccounting", params);}
    public void setCrmAccountingUpd(Map<String, Object> params) {insert("crm.setCrmAccountingUpd", params);}
    public void setCrmAccountingFileUpd(Map<String, Object> params) {insert("crm.setCrmAccountingFileUpd", params);}
    public Map<String, Object> getCrmMgScale(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmMgScale", params);}
    public void setCrmMgScale(Map<String, Object> params) {insert("crm.setCrmMgScale", params);}
    public void setCrmMgScaleUpd(Map<String, Object> params) {insert("crm.setCrmMgScaleUpd", params);}
    public Map<String, Object> getCrmInterests(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmInterests", params);}
    public void setCrmInterests(Map<String, Object> params) {insert("crm.setCrmInterests", params);}
    public void setCrmInterestsUpd(Map<String, Object> params) {insert("crm.setCrmInterestsUpd", params);}
    public List<Map<String, Object>> getCrmHistList(Map<String, Object> params) {return selectList("crm.getCrmHistList", params);}
    public List<Map<String, Object>> getCrmHistDetailList(Map<String, Object> params) {return selectList("crm.getCrmHistDetailList", params);}
    public List<Map<String, Object>> getCrmOldHistList(Map<String, Object> params) {return selectList("crm.getCrmOldHistList", params);}
    public List<Map<String, Object>> getCrmHistEngnList(Map<String, Object> params) {return selectList("crm.getCrmHistEngnList", params);}
    public List<Map<String, Object>> getCrmOldHistEngnList(Map<String, Object> params) {return selectList("crm.getCrmOldHistEngnList", params);}
    public List<Map<String, Object>> getCrmHistRndList(Map<String, Object> params) {return selectList("crm.getCrmHistRndList", params);}
    public List<Map<String, Object>> getCrmOldHistRndList(Map<String, Object> params) {return selectList("crm.getCrmOldHistRndList", params);}
    public List<Map<String, Object>> getCrmHistNonRndList(Map<String, Object> params) {return selectList("crm.getCrmHistNonRndList", params);}
    public List<Map<String, Object>> getCrmOldHistNonRndList(Map<String, Object> params) {return selectList("crm.getCrmOldHistNonRndList", params);}
    public Map<String, Object> getCUIDOne(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCUIDOne", params);}
    public void setCrmHistDel(Map<String, Object> params) {delete("crm.setCrmHistDel", params);}
    public Map<String, Object> getCrmHist(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getCrmHist", params);}
    public void insCrmBustHist(Map<String, Object> params) {insert("crm.insCrmBustHist", params);}
    public void insCrmHist(Map<String, Object> params) {insert("crm.insCrmHist", params);}
    public void insCrmEngnHist(Map<String, Object> params) {insert("crm.insCrmEngnHist", params);}
    public void setMfOverviewDel(Map<String, Object> params) {delete("crm.setMfOverviewDel", params);}
    public void setMfOverviewByCrmInfoUpd(Map<String, Object> params) {update("crm.setMfOverviewByCrmInfoUpd", params);}
    public Map<String, Object> getMfOverviewInfo(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getMfOverviewInfo", params);}
    public Map<String, Object> getMfOverviewStatInfo(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getMfOverviewStatInfo", params);}
    public List<Map<String, Object>> getMfOverviewAreaStat(Map<String, Object> params) {return selectList("crm.getMfOverviewAreaStat", params);}
    public List<Map<String, Object>> getMfOverviewList(Map<String, Object> params) {return selectList("crm.getMfOverviewList", params);}
    public int getMfOverviewListCnt(Map<String, Object> params) {return (int)selectOne("crm.getMfOverviewListCnt", params);}
    public void setMfOverview(Map<String, Object> params) {insert("crm.setMfOverview", params);}
    public List<Map<String, Object>> groupCodeList(Map<String, Object> params) {return selectList("crm.groupCodeList", params);}
    public void saveGroupCode(Map<String, Object> params) {
        insert("crm.insGroupCode", params);
    }
    public List<Map<String, Object>> codeList(Map<String, Object> params) {return selectList("crm.codeList", params);}
    public void insSetLgCode(Map<String, Object> params) {
        update("crm.insSetLgCode", params);
    }
    public List<Map<String, Object>> smCodeList(Map<String, Object> params) {return selectList("crm.smCodeList", params);}
    public void insCrmCode(Map<String, Object> params) {insert("crm.insCrmCode", params);}
    public List<Map<String, Object>> selLgCode(Map<String, Object> params) {return selectList("crm.selLgCode", params);}
    public List<Map<String, Object>> selSmCode(Map<String, Object> params) {return selectList("crm.selSmCode", params);}
    public Object setMouAgrInfo(Map<String, Object> params) {return insert("crm.setMouAgrInfo", params);}
    public void updMouAgrInfo(Map<String, Object> params) {update("crm.updMouAgrInfo", params);}
    public List<Map<String, Object>> getMouAgrList(Map<String, Object> params) {return selectList("crm.getMouAgrList", params);}
    public void setMouAgrSnDel(Map<String, Object> params) {update("crm.setMouAgrSnDel", params);}
    public List<Map<String, Object>> getMouCrmList(Map<String, Object> params) {return selectList("crm.getMouCrmList", params);}
    public void setMouAgrCrmInfo(Map<String, Object> params) {insert("crm.setMouAgrCrmInfo", params);}
    public void setMouCrmSnDel(Map<String, Object> params) {update("crm.setMouCrmSnDel", params);}
    public Map<String, Object> getMouArgInfo(Map<String, Object> params) {return (Map<String, Object>) selectOne("crm.getMouArgInfo", params);}
    public List<Map<String, Object>> getMouAgrFileInfo(Map<String, Object> params) {return selectList("crm.getMouAgrFileInfo", params);}
}

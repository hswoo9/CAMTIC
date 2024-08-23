package egovframework.com.devjitsu.g20.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class G20Repository extends AbstractDAO {
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {

        return selectListMs("g20.getProjectList", params);
    }

    public List<Map<String, Object>> getProjectViewList(Map<String, Object> params) {
        return selectListMs("g20.getProjectViewList", params);
    }

    public List<Map<String, Object>> getCommonGisuInfo(Map<String, Object> params) {
        return selectListMs("g20.getCommonGisuInfo", params);
    }

    public List<Map<String, Object>> getSubjectList(Map<String, Object> params) {
        return selectListMs("g20.getBgtList", params);
    }

    public int getProjectCount(Map<String, Object> params) {
        return (int) selectOneMs("g20.getProjectCount", params);
    }

    public void insProject(Map<String, Object> params) {
        insertMs("g20.insProject", params);
    }

    public List<Map<String, Object>> getBudgetInfo(Map<String, Object> params) {
        return selectListMs("g20.getBudgetInfo", params);
    }

    public List<Map<String, Object>> getBankList(Map<String, Object> params) {
        return selectListMs("g20.getBankList", params);
    }

    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOneMs("g20.getCrmInfo", params);
    }

    public void insCrmInfo(Map<String, Object> params) {
        insertMs("g20.insCrmInfo", params);
    }

    public List<Map<String, Object>> getClientList(Map<String, Object> params) {
        return selectListMs("g20.getClientList", params);
    }

    public Map<String, Object> getClientInfoOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOneMs("g20.getClientInfoOne", params);
    }

    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        return selectListMs("g20.getCardList", params);
    }

    public List<Map<String, Object>> getOtherList(Map<String, Object> params) {
        return selectListMs("g20.getOtherList", params);
    }

    public List<Map<String, Object>> getCardCompanyList(Map<String, Object> params) {
        return selectListMs("g20.getCardCompanyList", params);
    }

    public List<Map<String, Object>> getOtherDupl(Map<String, Object> params) {
        return selectListMs("g20.getOtherDupl", params);
    }

    public Map<String, Object> getSempData(Map<String, Object> params) {
        return (Map<String, Object>) selectOneMs("g20.getSempData", params);
    }

    public Map<String, Object> getTradeInfo(Map<String, Object> data) {
        return (Map<String, Object>) selectOneMs("g20.getTradeInfo", data);
    }

    public Map<String, Object> getHearnerInfo(Map<String, Object> data) {
        return (Map<String, Object>) selectOneMs("g20.getHearnerInfo", data);
    }

    public void insZnSautoabdocu(Map<String, Object> data) {
        insertMs("g20.insZnSautoabdocu", data);
    }

    public void execUspAncj080Insert00(Map<String, Object> data) {
        insertMs("g20.execUspAncj080Insert00", data);
    }

    public Map<String, Object> getProjectData(Map<String, Object> params) {
        return (Map<String, Object>) selectOneMs("g20.getProjectData", params);
    }

    public Map<String, Object> getBankData(Map<String, Object> g20ProjectData) {
        return (Map<String, Object>) selectOneMs("g20.getBankData", g20ProjectData);
    }

    public List<Map<String, Object>> getBudgetList(Map<String, Object> params) {
        return selectListMs("g20.getBudgetList", params);
    }

    public List<Map<String, Object>> getCorpProjectList(Map<String, Object> params) {
        return selectListMs("g20.getCorpProjectList", params);
    }

    public Map<String, Object> getProjectInfo(Map<String, Object> data) {
        return (Map<String, Object>) selectOneMs("g20.getProjectInfo", data);
    }

    public List<Map<String, Object>> getG20ProjectList(Map<String, Object> params) {
        return selectListMs("g20.getG20ProjectList", params);
    }

    public List<Map<String, Object>> getEtaxList(Map<String, Object> params) {
        return selectList("manage.getEtaxList", params);
    }

    public Map<String, Object> getEtaxData(Map<String, Object> params) {
        return (Map<String, Object>) selectOneMs("g20.getEtaxData", params);
    }

    public List<Map<String, Object>> getSbankList(Map<String, Object> params) {
        return selectListMs("g20.getSbankList", params);
    }

    public int getLastPCd() {
        return (int) selectOneMs("g20.getLastPCd");
    }

    public void insEtcEmpInfo(Map<String, Object> params) {
        insertMs("g20.insEtcEmpInfo", params);
    }

    public List<Map<String, Object>> getEtaxDb(Map<String, Object> params) {
        return selectListMs("g20.getEtaxDb", params);
    }

    public void execUspAncj080Delete00(Map<String, Object> exnpMap) {
        insertMs("g20.execUspAncj080Delete00", exnpMap);
    }

    public Map<String, Object> getExnpDocData(Map<String, Object> exnpMap) {
        return (Map<String, Object>) selectOneMs("g20.getExnpDocData", exnpMap);
    }

    public Map<String, Object> getIncpDocData(Map<String, Object> exnpMap) {
        return (Map<String, Object>) selectOneMs("g20.getIncpDocData", exnpMap);
    }

    public void delExnpDocData(Map<String, Object> g20Map) {
        insertMs("g20.delExnpDocData", g20Map);
    }

    public Map<String, Object> getExnpDocDataEtc(Map<String, Object> exnpMap) {
        return (Map<String, Object>) selectOneMs("g20.getExnpDocDataEtc", exnpMap);
    }

    public void delExnpReDocData(Map<String, Object> map) {
        insertMs("g20.delExnpReDocData", map);

    }

    public void delIncpReDocData(Map<String, Object> map) {
        insertMs("g20.delIncpReDocData", map);

    }

    public List<Map<String, Object>> getPaymentNotDoneList(Map<String, Object> params) {
        return selectListMs("g20.getPaymentNotDoneList", params);
    }

    public void delG20Error(Map<String, Object> params) {
        insertMs("g20.delG20Error", params);
    }

    public int getLastFCd() {
        return (int) selectOneMs("g20.getLastFCd");
    }

    public void updHearCode(Map<String, Object> params) {
        insertMs("g20.updHearCode", params);
    }

    public void insHearEmpInfo(Map<String, Object> params) {
        insertMs("g20.insHearEmpInfo", params);
    }

    public List<Map<String, Object>> getG20BudgetSum(Map<String, Object> params) {
        return selectListMs("g20.getG20BudgetSum", params);
    }

    public List<Map<String, Object>> getBudgetGroupList(Map<String, Object> params) {
        return selectListMs("g20.getBudgetGroupList", params);
    }

}

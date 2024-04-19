package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ManageRepository extends AbstractDAO {

    public List<Map<String, Object>> getMemList(Map<String, Object> params) {
        return selectList("manage.getMemList", params);
    }

    public Map<String, Object> getProjectData(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("manage.getProjectData", map);
    }

    public Map<String, Object> getEmpInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getEmpInfo", params);
    }

    public List<Map<String, Object>> getUserPartRateInfo(Map<String, Object> params) {
        return selectList("manage.getUserPartRateInfo", params);
    }

    public Map<String, Object> getUserSalList(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getUserSalList", params);
    }

    public Map<String, Object> checkExnpDetData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.checkExnpDetData", params);
    }

    public void insIncmExpInfo(List<Map<String, Object>> params){
        insert("manage.insIncmExpInfo", params);
    }

    public void incmExpInfoActiveN(Map<String, Object> params){
        update("manage.incmExpInfoActiveN", params);
    }

    public List<Map<String, Object>> getProjectBgtList(Map<String, Object> params) {
        return selectList("manage.getProjectBgtList", params);
    }

    public int getProjectBgtCheck(Map<String, Object> params) {
        return (int) selectOne("manage.getProjectBgtCheck", params);
    }

    public void delDjCardList(Map<String, Object> params) {
        delete("manage.delDjCardList", params);
    }

    public void insDjCardList(List<Map<String, Object>> list) {
        insert("manage.insDjCardList", list);
    }

    public void setManageDepo(Map<String, Object> params) { insert("manage.setManageDepo", params); }
    public void updateManageDepo(Map<String, Object> params) { insert("manage.updateManageDepo", params); }

    public int chkManageDepo(Map<String, Object> params) {
        return (int) selectOne("manage.chkManageDepo", params);
    }
    public Map<String, Object> getManageDepo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getManageDepo", params);
    }

    public void delDjEtax(Map<String, Object> list) {
        delete("manage.delDjEtax", list);
    }

    public void insDjEtaxUp(List<Map<String, Object>> list) {
        insert("manage.insDjEtaxUp", list);
    }

    public List<Map<String, Object>> getEtaxListAll(Map<String, Object> params) {

        return selectList("manage.getEtaxListAll", params);
    }

    public List<Map<String, Object>> getUserAccountManagementList(Map<String, Object> map) {
        return selectList("manage.getUserAccountManagementList", map);
    }

    public List<Map<String, Object>> getApproveExnpList() {

        return selectList("manage.getApproveExnpList", null);
    }

    public Map<String, Object> getAccountInfoOne(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("manage.getAccountInfoOne", params);
    }

    public Map<String, Object> getCurrentAmountStatus(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("manage.getCurrentAmountStatus", params);
    }

    public Map<String, Object> getCarryoverAmt(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("manage.getCarryoverAmt", params);
    }

    public void updProjectCarryoverAmt(Map<String, Object> params) {

        update("manage.updProjectCarryoverAmt", params);
    }

    public void updCorpProjectCarryoverAmt(Map<String, Object> params) {

        update("manage.updCorpProjectCarryoverAmt", params);
    }

    public List<Map<String, Object>> getBudgetDetailViewData(Map<String, Object> params) {

        return selectList("manage.getBudgetDetailViewData", params);
    }
}

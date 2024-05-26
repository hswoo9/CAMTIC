package egovframework.com.devjitsu.inside.salary.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SalaryManageRepository extends AbstractDAO  {

    public List<Map<String, Object>> getEmpSalaryManageList(Map<String, Object> params){ return selectList("salaryManage.getEmpSalaryManageList", params);}
    public List<Map<String, Object>> getSocialRateManageList(Map<String, Object> params){ return selectList("salaryManage.getSocialRateManageList", params);}
    public void setSocialRate(Map<String, Object> params) { insert("salaryManage.setSocialRate", params);}
    public void setSocialRateUpd(Map<String, Object> params) { insert("salaryManage.setSocialRateUpd", params);}
    public void setSocialRateDel(Map<String, Object> params) { update("salaryManage.setSocialRateDel", params);}

    public List<Map<String, Object>> getEmpSalaryDataList(Map<String, Object> params) {
        return selectList("salaryManage.getEmpSalaryDataList", params);
    }

    public void updBefEndDt(Map<String, Object> params) {
        update("salaryManage.updBefEndDt", params);
    }

    public void insSalaryManage(Map<String, Object> params) {
        insert("salaryManage.insSalaryManage", params);
    }

    public void updSalaryManage(Map<String, Object> params) {
        update("salaryManage.updSalaryManage", params);
    }

    public List<Map<String, Object>> getSalaryList(Map<String, Object> params) {
        return selectList("salaryManage.getSalaryList", params);
    }

    public void delSalaryManage(Map<String, Object> params) {
        delete("salaryManage.delSalaryManage", params);
    }

    public void delSalaryManageList(Map<String, Object> params) {
        delete("salaryManage.delSalaryManageList", params);
    }

    public void insSalaryManageList(List<Map<String, Object>> newList) {
        insert("salaryManage.insSalaryManageList", newList);
    }

    public int getsocialRateSn(Map<String, Object> map) {
        return (int) selectOne("salaryManage.getsocialRateSn", map);
    }

    public List<Map<String, Object>> getExcelEmpInfoList() {
        return selectList("salaryManage.getExcelEmpInfoList");
    }

    public int getExcelEmpSeq(Map<String, Object> dataMap) {
        return (int) selectOne("salaryManage.getExcelEmpSeq", dataMap);
    }

    public String getEmpNameAndTeam(Map<String, Object> dataMap) {
        return (String) selectOne("salaryManage.getEmpNameAndTeam", dataMap);
    }

    public List<Map<String, Object>> getPayRollLedgerList(Map<String, Object> params) {
        return selectList("salaryManage.getPayRollLedgerList", params);
    }
    public List<Map<String, Object>> getPayRollLedgerStatusList(Map<String, Object> params) {
        return selectList("salaryManage.getPayRollLedgerStatusList", params);
    }

    public void setPayRollLegerDel(Map<String, Object> params) { delete("salaryManage.setPayRollLegerDel", params);}
    public void setPayRollLeger(List<Map<String, Object>> list) { insert("salaryManage.setPayRollLeger", list);}
}


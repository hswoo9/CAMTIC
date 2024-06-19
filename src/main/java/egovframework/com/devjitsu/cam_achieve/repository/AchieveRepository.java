package egovframework.com.devjitsu.cam_achieve.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class AchieveRepository extends AbstractDAO {


    public Map<String, Object> getAllPjtCalc(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getAllPjtCalc", params);
    }

    public List<Map<String, Object>> getEngnPjtCalc(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnPjtCalc", params);
    }

    public List<Map<String, Object>> getRndPjtCalc(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getRndPjtCalc", params);
    }

    public Long getRndSaleAmt(Map<String, Object> params) {

        return (Long) selectOne("achieve.getRndSaleAmt", params);
    }

    public long getPurcRndAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getPurcRndAmt", params);
    }

    public long getBustripRndAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getBustripRndAmt", params);
    }

    public long getExnpRndAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getExnpRndAmt", params);
    }

    public List<Map<String, Object>> getExnpRndAmtList(Map<String, Object> params) {

        return selectList("achieve.getExnpRndAmtList", params);
    }

    public List<Map<String, Object>> getIncpRndAmtList(Map<String, Object> params) {

        return selectList("achieve.getIncpRndAmtList", params);
    }

    public long getPurcEngnAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getPurcEngnAmt", params);
    }

    public long getBustripEngnAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getBustripEngnAmt", params);
    }

    public long getEstEngnAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getEstEngnAmt", params);
    }

    public List<Map<String, Object>> getEngnList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnList", params);
    }

    public List<Map<String, Object>> getEngnDeptData(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnDeptData", params);
    }

    public List<Map<String, Object>> getEngnSaleList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnSaleList", params);
    }

    public List<Map<String, Object>> getEngnPurcList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnPurcList", params);
    }

    public List<Map<String, Object>> getEngnBustripList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnBustripList", params);
    }

    public List<Map<String, Object>> getRndSaleList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getRndSaleList", params);
    }

    public List<Map<String, Object>> getEngnEstList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnEstList", params);
    }

    public List<Map<String, Object>> getRndIncpList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getRndIncpList", params);
    }

    public List<Map<String, Object>> getDeptObjList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getDeptObjList", params);
    }

    public List<Map<String, Object>> getObjByDeptList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getObjByDeptList", params);
    }

    public void insDeptObjSetting(Map<String, Object> params) {

        insert("achieve.insDeptObjSetting", params);
    }

    public void updDeptObjSetting(Map<String, Object> params) {

        update("achieve.updDeptObjSetting", params);
    }

    public List<Map<String, Object>> getExnpCompAmt(Map<String, Object> params) {

        return selectList("achieve.getExnpCompAmt", params);
    }

    public List<Map<String, Object>> geincpCompAmt(Map<String, Object> params) {

        return selectList("achieve.geincpCompAmt", params);
    }

    public Map<String, Object> getResultProject(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getResultProject", params);
    }

    public Map<String, Object> getPjtDevSn(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getPjtDevSn", params);
    }

    public void insProjectPaySet(Map<String, Object> params) {

        insert("achieve.insProjectPaySet", params);
    }

    public void updProjectPaySet(Map<String, Object> params) {

        update("achieve.updProjectPaySet", params);
    }

    public Map<String, Object> getProjectPaySet(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getProjectPaySet", params);
    }

    public Map<String, Object> getDeptObjAmt(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getDeptObjAmt", params);
    }

    public Map<String, Object> getDeptPayrollData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getDeptPayrollData", params);
    }

    public List<Map<String, Object>> getDeptPayrollList(Map<String, Object> params) {
        return selectList("achieve.getDeptPayrollList", params);
    }
}

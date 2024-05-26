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

    public long getPurcEngnAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getPurcEngnAmt", params);
    }

    public long getBustripEngnAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getBustripEngnAmt", params);
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

    public List<Map<String, Object>> getRndSaleList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getRndSaleList", params);
    }
}

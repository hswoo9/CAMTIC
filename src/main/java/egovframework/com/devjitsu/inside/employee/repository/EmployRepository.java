package egovframework.com.devjitsu.inside.employee.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EmployRepository extends AbstractDAO {


    public List<Map<String, Object>> getBusinessParticipationList(Map<String, Object> params) {
        return selectList("employM.getBusinessParticipationList", params);
    }

    public List<Map<String, Object>> getBusinessParticipationData(Map<String, Object> params) {
        return selectList("employM.getBusinessParticipationData", params);
    }
    public List<Map<String, Object>> getBusnPartRatePayData(Map<String, Object> params) {
        return selectList("employM.getBusnPartRatePayData", params);
    }

    public List<Map<String, Object>> getUserPartRateList(Map<String, Object> params) {
        return selectList("employM.getUserPartRateList", params);
    }

    public List<Map<String, Object>> getBusnPartRatePay(Map<String, Object> params) {
        return selectList("employM.getBusnPartRatePay", params);
    }
    public void setBusnPartRatePay(Map<String, Object> params) {
        insert("employM.setBusnPartRatePay", params);
    }
    public void delBusnPartRatePay(Map<String, Object> params) {
        delete("employM.delBusnPartRatePay", params);
    }
}

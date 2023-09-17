package egovframework.com.devjitsu.inside.salary.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SalaryManageRepository extends AbstractDAO  {

    public List<Map<String, Object>> getSocialRateManageList(Map<String, Object> params){ return selectList("salaryManage.getSocialRateManageList", params);}
    public void setSocialRate(Map<String, Object> params) { insert("salaryManage.setSocialRate", params);}
    public void setSocialRateUpd(Map<String, Object> params) { insert("salaryManage.setSocialRateUpd", params);}
    public void setSocialRateDel(Map<String, Object> params) { update("salaryManage.setSocialRateDel", params);}
}


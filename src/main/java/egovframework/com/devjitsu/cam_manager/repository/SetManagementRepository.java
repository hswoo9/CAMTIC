package egovframework.com.devjitsu.cam_manager.repository;


import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SetManagementRepository extends AbstractDAO {


    public void insCorpProject(Map<String, Object> params) {
        insert("manage.insCorpProject", params);
    }

    public List<Map<String, Object>> getCorpProjectList(Map<String, Object> params) {
        return selectList("manage.getCorpProjectList", params);
    }

    public List<Map<String, Object>> getCorpProjectListMng(Map<String, Object> params) {
        return selectList("manage.getCorpProjectListMng", params);
    }

    public Map<String, Object> getCorpProjectData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getCorpProjectData", params);
    }

    public void updCorpProject(Map<String, Object> params) {
        update("manage.updCorpProject", params);
    }

    public void setRequest(Map<String, Object> params) {
        update("manage.setRequest", params);
    }

    public void setApprove(Map<String, Object> params) {
        update("manage.setApprove", params);
    }

    public List<Map<String, Object>> getExnpDeChangeRs(Map<String, Object> params) {
        return selectList("manage.getExnpDeChangeRs", params);
    }

    public void updExnpDeChangeRs(Map<String, Object> params) {
        update("manage.updExnpDeChangeRs", params);
    }

    public void insExnpDeChangeRs(Map<String, Object> params) {
        insert("manage.insExnpDeChangeRs", params);
    }

    public void delExnpDeChangeRs(Map<String, Object> params) {
        delete("manage.delExnpDeChangeRs", params);
    }

    public void setRndProjectPrevNextAmt(Map<String, Object> params) {
        insert("manage.setRndProjectPrevNextAmt", params);
    }

    public void updRndProjectPrevNextAmt(Map<String, Object> params) {
        update("manage.updRndProjectPrevNextAmt", params);
    }

    public Map<String, Object> getRndProjectPrevNextAmt(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getRndProjectPrevNextAmt", params);
    }

    public Map<String, Object> getCorpProjectDataByCd(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getCorpProjectDataByCd", params);
    }
}

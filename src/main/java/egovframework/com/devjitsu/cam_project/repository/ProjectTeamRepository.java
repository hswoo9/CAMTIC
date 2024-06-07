package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProjectTeamRepository extends AbstractDAO {

    public List<Map<String, Object>> getTeamVersion(Map<String, Object> params) {
        return selectList("projectTeam.getTeamVersion", params);
    }

    public List<Map<String, Object>> getTeamList(Map<String, Object> params) {
        return selectList("projectTeam.getTeamList", params);
    }

    public List<Map<String, Object>> getTeamMngList(Map<String, Object> params) {
        return selectList("projectTeam.getTeamMngList", params);
    }

    public List<Map<String, Object>> getTeamListAll(Map<String, Object> params) {
        return selectList("projectTeam.getTeamListAll", params);
    }

    public List<Map<String, Object>> getTeamBudgetList(Map<String, Object> params) {
        return selectList("projectTeam.getTeamBudgetList", params);
    }

    public Map<String, Object> getVerLeftAmt(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectTeam.getVerLeftAmt", params);
    }

    public Map<String, Object> getTeamData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectTeam.getTeamData", params);
    }

    public Map<String, Object> getLastVerTeamData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectTeam.getLastVerTeamData", params);
    }

    public void setTeamAddVersion(Map<String, Object> params) {
        insert("projectTeam.setTeamAddVersion", params);
    }

    public void setTeamDelv(Map<String, Object> params) {
        insert("projectTeam.setTeamDelv", params);
    }

    public void updMyTeam(Map<String, Object> params) {
        update("projectTeam.updMyTeam", params);
    }

    public void insTeam(Map<String, Object> params) {
        insert("projectTeam.insTeam", params);
    }

    public void updTeam(Map<String, Object> params) {
        update("projectTeam.updTeam", params);
    }

    public void delTeam(Map<String, Object> params) {
        update("projectTeam.delTeam", params);
    }

    public void setTeamCopy(Map<String, Object> params) {
        insert("projectTeam.setTeamCopy", params);
    }

    public void insTeamProject(Map<String, Object> params) {
        insert("projectTeam.insTeamProject", params);
    }

    public void updTeamProject(Map<String, Object> params) {
        update("projectTeam.updTeamProject", params);
    }

    public void delTeamProject(Map<String, Object> params) {
        update("projectTeam.delTeamProject", params);
    }

    public void updPmAppStat(Map<String, Object> params) {
        update("projectTeam.updPmAppStat", params);
    }

    public void updTeamAppStat(Map<String, Object> params) {
        update("projectTeam.updTeamAppStat", params);
    }

    public void updTeamVersionAppStat(Map<String, Object> params) {
        update("projectTeam.updTeamVersionAppStat", params);
    }

    public void setTeamBudgetCopy(Map<String, Object> params) {
        insert("projectTeam.setTeamBudgetCopy", params);
    }

    public void insTeamBudget(Map<String, Object> params) {
        insert("projectTeam.insTeamBudget", params);
    }

    public void delTeamBudget(Map<String, Object> params) {
        delete("projectTeam.delTeamBudget", params);
    }
}

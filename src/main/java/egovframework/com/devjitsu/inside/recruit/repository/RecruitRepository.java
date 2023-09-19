package egovframework.com.devjitsu.inside.recruit.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RecruitRepository extends AbstractDAO {

    public Map<String, Object> getRecruitNum() {
        return (Map<String, Object>)selectOne("recruit.getRecruitNum");
    }
    public List<Map<String, Object>> getRecruitList(Map<String, Object> params) { return selectList("recruit.getRecruitList", params); }
    public Map<String, Object> getRecruit(Map<String, Object> params) { return (Map<String, Object>) selectOne("recruit.getRecruit", params);}
    public List<Map<String, Object>> getRecruitAreaList(Map<String, Object> params) { return selectList("recruit.getRecruitAreaList", params); }
    public Map<String, Object> getRecruitArea(Map<String, Object> params) { return (Map<String, Object>) selectOne("recruit.getRecruitArea", params);}
    public List<Map<String, Object>> getCommissionerList(Map<String, Object> params) { return selectList("recruit.getCommissionerList", params); }
    public void setCommissionerDel(Map<String, Object> params) { update("recruit.setCommissionerDel", params);}
    public int setRecruitInsert(Map<String, Object> params) { int result = (int)insert("recruit.setRecruitInsert", params); return result;}
    public void setRecruitUpdate(Map<String, Object> params) { insert("recruit.setRecruitUpdate", params);}
    public void setRecruitAreaDelete(Map<String, Object> params) { insert("recruit.setRecruitAreaDelete", params);}
    public void setRecruitAreaInsert(Map<String, Object> params) { insert("recruit.setRecruitAreaInsert", params);}
    public int setCommissionerInsert(Map<String, Object> params) { int result = (int)insert("recruit.setCommissionerInsert", params); return result;}
    public void setRecruitStatusUpd(Map<String, Object> params) { update("recruit.setRecruitStatusUpd", params);}
    public List<Map<String, Object>> getApplicationList(Map<String, Object> params) { return selectList("recruit.getApplicationList", params); }
    public List<Map<String, Object>> getUserDuplicationList(Map<String, Object> params) { return selectList("recruit.getUserDuplicationList", params); }
    public void setApplicationUpd(Map<String, Object> params) { update("recruit.setApplicationUpd", params);}
    public void setInAvoidUpd(Map<String, Object> params) { update("recruit.setInAvoidUpd", params);}
    public void setInAvoidScoreBoardDel(Map<String, Object> params) { delete("recruit.setInAvoidScoreBoardDel", params);}
    public void setApplicationInTimeDel(Map<String, Object> params) { delete("recruit.setApplicationInTimeDel", params);}
    public void setApplicationInTime(List<Map<String, Object>> params) { insert("recruit.setApplicationInTime", params);}
    public List<Map<String, Object>> getInApplicationList(Map<String, Object> params) { return selectList("recruit.getInApplicationList", params); }
    public void setPrePassAppl(Map<String, Object> params) { update("recruit.setPrePassAppl", params);}
}

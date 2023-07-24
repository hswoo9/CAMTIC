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
    public int setRecruitInsert(Map<String, Object> params) { int result = (int)insert("recruit.setRecruitInsert", params); return result;}
    public void setRecruitAreaInsert(Map<String, Object> params) { insert("recruit.setRecruitAreaInsert", params);}
}

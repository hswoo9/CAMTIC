package egovframework.com.devjitsu.inside.recruit.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class RecruitRepository extends AbstractDAO {

    public Map<String, Object> getRecruitNum() {
        return (Map<String, Object>)selectOne("recruit.getRecruitNum");
    }
}

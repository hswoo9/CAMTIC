package egovframework.com.devjitsu.cam_achieve.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.Map;


@Repository
public class AchieveRepository extends AbstractDAO {


    public Map<String, Object> getAllPjtCalc(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getAllPjtCalc", params);
    }
}

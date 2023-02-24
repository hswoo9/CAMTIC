package egovframework.com.devjitsu.user.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserRepository extends AbstractDAO {

    public List<Map<String, Object>> getOrgDeptList(Map<String, Object> param) {
        return selectList("user.getOrgDeptList", param);
    }

}

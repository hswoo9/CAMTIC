package egovframework.com.devjitsu.system.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class MenuManagementRepository extends AbstractDAO {

    public List<Map<String, Object>> getMenuList(Map<String, Object> params) {
        return selectList("menu.getMenuList", params);
    }
}

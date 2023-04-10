package egovframework.com.devjitsu.common.service.impl;

import com.google.gson.Gson;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.service.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CommonServiceImpl implements CommonService {

    private static final Logger logger = LoggerFactory.getLogger(CommonServiceImpl.class);

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public String ctDept(String deptSeq) {
        List<Map<String, Object>> list = commonRepository.ctDept();

        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

        String[] parentDeptSeq = {};

        for (Map<String, Object> map : list) {

            if(map.get("dept_seq").equals(deptSeq)){
                parentDeptSeq = ((String) map.get("path")).split("\\|");
                map.put("selected", true);
                map.put("expanded", true);
            }

        }

        for (Map<String, Object> map : list) {

            for (int i = 0; i < parentDeptSeq.length; i++) {
                if(map.get("dept_seq").equals(parentDeptSeq[i])){
                    map.put("expanded", true);
                }
            }

        }

        //부모
        for (Map<String, Object> vo : list) {
            if(vo.get("dept_seq").equals("1000")){
                vo.put("path", "camtic_new|"+vo.get("path"));
            }
            //자식
            for (Map<String, Object> vo2 : list) {

                if(vo.get("dept_seq").equals(vo2.get("parent_dept_seq"))){
                    vo2.put("path", "camtic_new|"+vo2.get("path"));
                    List<Map<String, Object>> sub = new ArrayList<Map<String, Object>>();
                    if(vo.containsKey("items")){
                        sub = (List<Map<String, Object>>) vo.get("items");
                        sub.add(vo2);
                        vo.put("items", sub);
                    }else{
                        sub.add(vo2);
                        vo.put("items", sub);
                    }

                }

            }

            if(vo.get("org_type").equals("C")){
                result.add(vo);
            }

        }

        return new Gson().toJson(result);
    }

    @Override
    public List<Map<String, Object>> getUserList(Map<String, Object> params) {
        return commonRepository.getUserList(params);
    }

    @Override
    public int getUserListTotal(Map<String, Object> map) {
        return commonRepository.getUserListTotal(map);
    }
}

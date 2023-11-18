package egovframework.com.devjitsu.inside.salary.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.salary.repository.SalaryManageRepository;
import egovframework.com.devjitsu.inside.salary.service.SalaryManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class SalaryManageServiceImpl implements SalaryManageService {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(SalaryManageServiceImpl.class);

    @Autowired
    private SalaryManageRepository salaryManageRepository;

    @Override
    public List<Map<String, Object>> getEmpSalaryManageList(Map<String, Object> params) {
        return salaryManageRepository.getEmpSalaryManageList(params);
    }

    @Override
    public List<Map<String, Object>> getSocialRateManageList(Map<String, Object> params) {
        return salaryManageRepository.getSocialRateManageList(params);
    }

    @Override
    public void setSocialRate(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> newRateArr = gson.fromJson((String) params.get("newRateArr"), new TypeToken<List<Map<String, Object>>>() {
        }.getType());
        if (newRateArr.size() > 0) {
            params.put("newRateArr", newRateArr);
            salaryManageRepository.setSocialRate(params);
        }
        List<Map<String, Object>> oldRateArr = gson.fromJson((String) params.get("oldRateArr"), new TypeToken<List<Map<String, Object>>>() {
        }.getType());
        if (oldRateArr.size() > 0) {
            for (Map<String, Object> map : oldRateArr) {
                salaryManageRepository.setSocialRateUpd(map);
            }
        }
    }

    @Override
    public void setSocialRateDel(Map<String, Object> params) {
        salaryManageRepository.setSocialRateDel(params);
    }

    @Override
    public List<Map<String, Object>> getEmpSalaryDataList(Map<String, Object> params) {
        return salaryManageRepository.getEmpSalaryDataList(params);
    }

    @Override
    public void setSalaryManage(Map<String, Object> params) {

        String BEF_END_DT = LocalDate.parse(params.get("startDt").toString()).plusDays(-1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        params.put("befEndDt", BEF_END_DT);
        salaryManageRepository.updBefEndDt(params);

        if (!params.containsKey("salarySn")) {
            salaryManageRepository.insSalaryManage(params);
        } else {
            salaryManageRepository.updSalaryManage(params);
        }
    }

    @Override
    public List<Map<String, Object>> getSalaryList(Map<String, Object> params) {

        List<Map<String, Object>> list = new ArrayList<>();
        List<Map<String, Object>> newList = new ArrayList<>();

        list = salaryManageRepository.getSalaryList(params);

        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Map<String, Object> map : list) {
            if (map.get("START_DT") != null && !"".equals(map.get("START_DT"))) {
                String startYm = map.get("START_DT").toString().split("-")[0] + "-" + map.get("START_DT").toString().split("-")[1] + "-" + map.get("START_DT").toString().split("-")[2];

                if(map.get("END_DT") != null && !"".equals(map.get("END_DT"))){
                    String endYm = map.get("END_DT").toString().split("-")[0] + "-" + map.get("END_DT").toString().split("-")[1] + "-" + map.get("END_DT").toString().split("-")[2];

                    for(int i = 1 ; i <= Integer.parseInt(map.get("DIFF_MON").toString()) ; i++){

                        LocalDate s = LocalDate.parse(startYm, df);
                        LocalDate e = LocalDate.parse(endYm, df);
                        Map<String, Object> salMap = new HashMap<>();

                        salMap.put("empSeq", map.get("EMP_SEQ"));
                        salMap.put("empName", map.get("EMP_NAME_KR"));
                        salMap.put("deptName", map.get("DEPT_NAME"));
                        salMap.put("mon", startYm.split("-")[0] + startYm.split("-")[1] + startYm.split("-")[2]);
                        salMap.put("bsSal", map.get("BASIC_SALARY"));
                        salMap.put("extraPay", map.get("EXTRA_PAY"));
                        salMap.put("bonus", map.get("BONUS"));
                        salMap.put("footPay", map.get("FOOD_PAY"));
                        salMap.put("socialRateSn", map.get("SOCIAL_RATE_SN"));
                        newList.add(salMap);

                        if(!s.isEqual(e)){
                            startYm = LocalDate.parse(startYm).plusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                            startYm = startYm.split("-")[0] + "-" + startYm.split("-")[1] + "-01";
                        }else{
                            break;
                        }
                    }

                } else {
                    LocalDate nowDate = LocalDate.now();

                    String endYm = nowDate.format(df);



                    while(true){
                        LocalDate s = LocalDate.parse(startYm, df);
                        LocalDate e = LocalDate.parse(endYm, df);

                        Map<String, Object> salMap = new HashMap<>();

                        salMap.put("empSeq", map.get("EMP_SEQ"));
                        salMap.put("empName", map.get("EMP_NAME_KR"));
                        salMap.put("deptName", map.get("DEPT_NAME"));
                        salMap.put("mon", startYm.split("-")[0] + startYm.split("-")[1] + startYm.split("-")[2]);
                        salMap.put("bsSal", map.get("BASIC_SALARY"));
                        salMap.put("extraPay", map.get("EXTRA_PAY"));
                        salMap.put("bonus", map.get("BONUS"));
                        salMap.put("foodPay", map.get("FOOD_PAY"));
                        salMap.put("socialRateSn", map.get("SOCIAL_RATE_SN"));

                        newList.add(salMap);

                        if(!s.isEqual(e) && s.isBefore(e)){
                            startYm = LocalDate.parse(startYm).plusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                        }else{
                            break;
                        }
                    }
                }
            }
        }

        salaryManageRepository.delSalaryManageList(params);

        salaryManageRepository.insSalaryManageList(newList);

        return newList;
    }

    @Override
    public void delSalaryManage(Map<String, Object> params) {
        salaryManageRepository.delSalaryManage(params);
    }
}

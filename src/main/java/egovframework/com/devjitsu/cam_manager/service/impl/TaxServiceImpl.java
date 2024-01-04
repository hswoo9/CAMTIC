package egovframework.com.devjitsu.cam_manager.service.impl;

import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_manager.repository.TaxRepository;
import egovframework.com.devjitsu.cam_manager.service.TaxService;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
public class TaxServiceImpl implements TaxService {

    @Autowired
    private TaxRepository taxRepository;

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private ManageRepository manageRepository;

    @Override
    public List<Map<String, Object>> getTaxList(Map<String, Object> params) {
        return taxRepository.getTaxList(params);
    }

    @Override
    public void syncEtaxG20Data() {
        Date date = new Date();
        String strDate = "";
        String endDate = "";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        String nowDate = simpleDateFormat.format(date);

        LocalDate localDate = LocalDate.parse(nowDate);
        LocalDate firstDate = localDate.withDayOfMonth(1);
        LocalDate lastDate = localDate.withDayOfMonth(localDate.lengthOfMonth());

        strDate = firstDate.toString();
        endDate = lastDate.toString();

        Map<String, Object> params = new HashMap<>();

        params.put("strDate", strDate);
        params.put("endDate", endDate);

        List<Map<String, Object>> list = new ArrayList<>();
        list = g20Repository.getEtaxDb(params);

        if(list.size() > 0) {
            manageRepository.delDjEtax(params);
            manageRepository.insDjEtaxUp(list);
        }

    }
}

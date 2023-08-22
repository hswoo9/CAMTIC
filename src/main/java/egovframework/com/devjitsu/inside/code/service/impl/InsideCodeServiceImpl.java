package egovframework.com.devjitsu.inside.code.service.impl;

import egovframework.com.devjitsu.inside.code.repository.InsideCodeRepository;
import egovframework.com.devjitsu.inside.code.service.InsideCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InsideCodeServiceImpl implements InsideCodeService {

    @Autowired
    private InsideCodeRepository insideCodeRepository;

    @Override
    public List<Map<String, Object>> getCarCode(Map<String, Object> params) {
        return insideCodeRepository.getCarCode(params);
    }

    @Override
    public List<Map<String, Object>> getRoomCode(Map<String, Object> params) {
        return insideCodeRepository.getRoomCode(params);
    }

    @Override
    public Map<String, Object> getCarRequestInfo(Map<String, Object> params) {
        return insideCodeRepository.getCarRequestInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCarRequestList(Map<String, Object> params) {
        return insideCodeRepository.getCarRequestList(params);
    }

    @Override
    public List<Map<String, Object>> searchDuplicateCar(Map<String, Object> params) {
        return insideCodeRepository.searchDuplicateCar(params);
    }

    @Override
    public Map<String, Object> getCarStat(Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("type", insideCodeRepository.getCarStatType(params));
        result.put("total", insideCodeRepository.getCarStat(params));
        return result;
    }

    @Override
    public Map<String, Object> getRoomStat(Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("type", insideCodeRepository.getRoomStatType(params));
        result.put("total", insideCodeRepository.getRoomStat(params));
        return result;
    }

    @Override
    public Map<String, Object> getCarCodeInfo(Map<String, Object> params) {
        return insideCodeRepository.getCarCodeInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCarCodeList(Map<String, Object> params) {
        return insideCodeRepository.getCarCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getRoomRequestList(Map<String, Object> params) {
        return insideCodeRepository.getRoomRequestList(params);
    }

    @Override
    public List<Map<String, Object>> searchDuplicateRoom(Map<String, Object> params) {
        return insideCodeRepository.searchDuplicateRoom(params);
    }

    @Override
    public Map<String, Object> getRoomCodeInfo(Map<String, Object> params) {
        return insideCodeRepository.getRoomCodeInfo(params);
    }

    @Override
    public List<Map<String, Object>> getRoomCodeList(Map<String, Object> params) {
        return insideCodeRepository.getRoomCodeList(params);
    }



    @Override
    public void setCarRequestInsert(Map<String, Object> params) {
        insideCodeRepository.setCarRequestInsert(params);
    }

    @Override
    public void setCarRequestUpdate(Map<String, Object> params) {
        insideCodeRepository.setCarRequestUpdate(params);
    }

    @Override
    public void setCarCodeInsert(Map<String, Object> params) {
        insideCodeRepository.setCarCodeInsert(params);
    }

    @Override
    public void setCarCodeUpdate(Map<String, Object> params) {
        insideCodeRepository.setCarCodeUpdate(params);
    }

    @Override
    public void setCarCodeDelete(Map<String, Object> params) {
        insideCodeRepository.setCarCodeDelete(params);
    }

    @Override
    public void setRoomRequestInsert(Map<String, Object> params) {
        insideCodeRepository.setRoomRequestInsert(params);
    }

    @Override
    public void setRoomCodeInsert(Map<String, Object> params) {
        insideCodeRepository.setRoomCodeInsert(params);
    }

    @Override
    public void setRoomCodeUpdate(Map<String, Object> params) {
        insideCodeRepository.setRoomCodeUpdate(params);
    }

    @Override
    public void setRoomCodeDelete(Map<String, Object> params) {
        insideCodeRepository.setRoomCodeDelete(params);
    }
}

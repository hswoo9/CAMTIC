package egovframework.com.devjitsu.inside.history.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.history.repository.HistoryRepository;
import egovframework.com.devjitsu.inside.history.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    @Override
    public List<Map<String, Object>> getHistoryList(Map<String, Object> params) {
        return historyRepository.getHistoryList(params);
    }

    @Override
    public Map<String, Object> getHistoryOne(Map<String, Object> params) {
        return historyRepository.getHistoryOne(params);
    }

    @Override
    public List<Map<String, Object>> getRewardList(Map<String, Object> params) {
        return historyRepository.getRewardList(params);
    }

    @Override
    public void setHistoryInsert(Map<String, Object> params) {

        Gson gson = new Gson();
        List<Map<String, Object>> historyList = gson.fromJson((String) params.get("historyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("historyList", historyList);
        historyRepository.setHistoryInsert(params);
    }

    @Override
    public void setRewardInsert(Map<String, Object> params) {

        Gson gson = new Gson();
        List<Map<String, Object>> rewardList = gson.fromJson((String) params.get("rewardArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("rewardList", rewardList);
        historyRepository.setRewardInsert(params);
    }
}

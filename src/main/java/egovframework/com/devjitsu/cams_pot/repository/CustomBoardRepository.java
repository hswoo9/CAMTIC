package egovframework.com.devjitsu.cams_pot.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CustomBoardRepository extends AbstractDAO {
	private static final Logger logger = (Logger) LoggerFactory.getLogger(CustomBoardRepository.class);

	public List<Map<String, Object>> getScheduleList(Map<String, Object> params) { return selectList("cb.getScheduleList", params);}
	public void setScheduleReg(Map<String, Object> params) { insert("cb.setScheduleReg", params);}
	public void setScheduleRegUpd(Map<String, Object> params) { update("cb.setScheduleRegUpd", params);}
	public Map<String, Object> getSchedule(Map<String, Object> params) { return (Map<String, Object>) selectOne("cb.getSchedule", params);}
}

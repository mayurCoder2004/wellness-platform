import Session from '../models/Session.js';

export const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (err) {
    console.error("Get Public Sessions Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.userId });
    res.json(sessions);
  } catch (err) {
    console.error("Get User Sessions Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSingleSession = async (req, res) => {
  const sessionId = req.params.id;

  // 🛑 Skip DB query if the session is "new"
  if (sessionId === 'new') {
    return res.status(200).json({}); // return empty session
  }

  try {
    const session = await Session.findOne({
      _id: sessionId,
      user_id: req.user.userId,
    });

    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    console.error("Get Single Session Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const saveDraftSession = async (req, res) => {
  const { sessionId, title, tags, json_file_url } = req.body;

  try {
    let session;
    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id: req.user.userId },
        {
          title,
          tags: tags.split(',').map((tag) => tag.trim()),
          json_file_url,
          updated_at: new Date(),
        },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.user.userId,
        title,
        tags: tags.split(',').map((tag) => tag.trim()),
        json_file_url,
        status: 'draft',
      });
    }

    res.json(session);
  } catch (err) {
    console.error("Save Draft Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const publishSession = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: req.user.userId },
      { status: 'published', updated_at: new Date() },
      { new: true }
    );

    if (!session) return res.status(404).json({ message: 'Session not found or unauthorized' });

    res.json(session);
  } catch (err) {
    console.error("Publish Session Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

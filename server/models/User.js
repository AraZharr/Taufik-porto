const supabase = require('../config/supabase');

const mapUser = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    username: row.username,
    password: row.password,
    createdAt: row.created_at
  };
};

class User {
  static async findByUsername(username) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();
    if (error) throw error;
    return mapUser(data);
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return mapUser(data);
  }

  static async create({ username, password }) {
    const { data, error } = await supabase
      .from('users')
      .insert({ username, password })
      .select()
      .single();
    if (error) throw error;
    return mapUser(data);
  }

  static async deleteAll() {
    const { error } = await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  }
}

module.exports = User;
